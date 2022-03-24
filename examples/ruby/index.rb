require 'sinatra'
require 'jwt'
require "sinatra/cors"

API_KEY = 'YOUR API KEY' # change this
key = OpenSSL::PKey::RSA.new Base64.decode64 API_KEY 

set :allow_origin, "http://localhost:3000"
set :allow_methods, "GET"
set :allow_headers, "content-type"
set :port, 8000

get '/' do
  content_type :json

  payload = {
    sub: 'user-id-of-your-app'
    exp: (Time.now + 60 * 60).to_i 
  }
  token = JWT.encode payload, key, algorithm='RS256'

  {token: token}.to_json
end

