-- Openfda SDK error

local OpenfdaError = {}
OpenfdaError.__index = OpenfdaError


function OpenfdaError.new(code, msg, ctx)
  local self = setmetatable({}, OpenfdaError)
  self.is_sdk_error = true
  self.sdk = "Openfda"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function OpenfdaError:error()
  return self.msg
end


function OpenfdaError:__tostring()
  return self.msg
end


return OpenfdaError
