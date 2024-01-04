package common

type StoreType int

const (
	_ StoreType = iota
	StoreLocal
	StoreCeph
	StoreOSS
	StoreMix
	StoreAll
)