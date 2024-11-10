from bs4 import BeautifulSoup
import requests
import random
import concurrent.futures,os
headers = {'Upgrade-Insecure-Requests':'1',
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding':'gzip, deflate, sdch, br',
    'Accept-Language':'zh-CN,zh;q=0.8',
    'Connection':'close',
    }
 
ip_url = 'http://httpbin.org/ip'
 
def get_ip_list(url):
    page = requests.get(url,headers=headers)
    soup = BeautifulSoup(page.text,'lxml')
    # print(soup)
    ips = soup.find_all('tr')
    ip_list = []
    for i in range(1,len(ips)):
        ip_info = ips[i]
        td = ip_info.find_all('td')
        ip_list.append(td[1].text + ':'+ td[2].text)
    ip_set = set(ip_list)
    ip_list = list(ip_set)      #去重
    print(ip_list)
    #true_ip = []
    with concurrent.futures.ThreadPoolExecutor(len(ip_list)) as x:
        for ip in ip_list:
            x.submit(ip_test,ip)
 
def ip_test(ip):
    proxies = {
        'http': 'http://' + ip,
        'https': 'https://' + ip,
    }
    print(proxies)
    try:
        response = requests.get(ip_url,headers=headers,proxies=proxies,timeout=3)
        if response.status_code == 200:
            with open('可用IP.txt','a') as f:
                f.write(ip)
                f.write('\n')
            print('测试通过')
            print(proxies)
            print(response.text)
    except Exception as e:
        print(e)
 
def get_random_ip(ip_list):
    proxy_list = []
    for ip in ip_list:
        proxy_list.append(ip)
    proxy_ip = random.choice(proxy_list)
    proxies = {'http': 'http://' + proxy_ip, 'https': 'https://' + proxy_ip}
    return proxies
 
if __name__ == '__main__':
    url = 'https://www.xicidaili.com/wt'
    if os.path.exists('可用IP.txt'):
        os.remove('可用IP.txt')
    get_ip_list(url)
    get_ip_list(url+'/2')