package core

type OpenfdaError struct {
	IsOpenfdaError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewOpenfdaError(code string, msg string, ctx *Context) *OpenfdaError {
	return &OpenfdaError{
		IsOpenfdaError: true,
		Sdk:              "Openfda",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *OpenfdaError) Error() string {
	return e.Msg
}
