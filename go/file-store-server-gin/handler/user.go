package handler

import (
	cfg "file-store-server/config"
	dblayer "file-store-server/db"
	"file-store-server/util"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func SignUpHandler(c *gin.Context) {
	c.Redirect(http.StatusFound, "/static/view/signup.html")
}

func DoSignUpHandler(c *gin.Context) {
	username := c.Request.FormValue("username")
	password := c.Request.FormValue("password")

	if len(username) < 3 || len(password) < 5 {
		c.JSON(http.StatusOK, gin.H{
			"msg":  "Invalid parameter",
			"code": -1,
		})
		return
	}

	enc_password := util.Sha1([]byte(password + cfg.PwdSalt))
	suc := dblayer.UserSignup(username, enc_password)
	if suc {
		c.JSON(http.StatusOK, gin.H{
			"msg":  "SignUp SUCCESS",
			"code": 0,
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"msg":  "SignUp FAILED",
			"code": -2,
		})
	}
}

func SignInHandler(c *gin.Context) {
	c.Redirect(http.StatusFound, "/static/view/signin.html")
}

func DoSignInHandler(c *gin.Context) {
	username := c.Request.FormValue("username")
	password := c.Request.FormValue("password")
	encPassword := util.Sha1([]byte(password + cfg.PwdSalt))

	pwdChecked := dblayer.UserSignIn(username, encPassword)
	if !pwdChecked {
		c.JSON(http.StatusOK, gin.H{
			"msg":  "SignIn FAILED",
			"code": -1,
		})
		return
	}

	token := GenToken(username)
	upRes := dblayer.UpdateToken(username, token)
	if !upRes {
		c.JSON(http.StatusOK, gin.H{
			"msg":  "SignIn FAILED",
			"code": -1,
		})
		return
	}

	resp := util.RespMsg{
		Code: 0,
		Msg:  "OK",
		Data: struct {
			Location string
			Username string
			Token    string
		}{
			Location: "/static/view/home.html",
			Username: username,
			Token:    token,
		},
	}
	c.Data(http.StatusOK, "application/json", resp.JSONBytes())
}

func UserInfoHandler(c *gin.Context) {
	username := c.Request.FormValue("username")

	user, err := dblayer.GetUserInfo(username)
	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{})
		return
	}

	resp := util.RespMsg{
		Code: 0,
		Msg:  "OK",
		Data: user,
	}

	c.Data(http.StatusOK, "application/json", resp.JSONBytes())
}

func GenToken(username string) string {
	ts := fmt.Sprintf("%x", time.Now().Unix())

	tokenPrefix := util.MD5([]byte(username + ts + "_tokensalt"))

	return tokenPrefix + ts[:8]
}

func IsTokenValid(token string) bool {
	return len(token) == 40
	// TODO: 判断token的时效性，是否过期
	// TODO: 从数据库表tbl_user_token查询username对应的token信息
	// TODO: 对比两个token是否一致
}
