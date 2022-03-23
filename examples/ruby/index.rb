require 'sinatra'
require 'jwt'
require "sinatra/cors"

set :allow_origin, "http://localhost:3001"
set :allow_methods, "GET"
set :allow_headers, "content-type,if-modified-since"
set :expose_headers, "location,link"

PRIVATE_KEY = OpenSSL::PKey::RSA.new Base64.decode64 'LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUJWZ0lCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQVVBd2dnRThBZ0VBQWtFQXR0ajY1WXE3QWl0R204WVIKeXdvSkZsRDNnSTdCNVZPaVdiRStIUitpdWZ4WEVaT1FabHczQXRsYm5sSlhGZWdjNTZIcmRyMU9wT3dKYllIRQp2Z2xPTXdJREFRQUJBa0VBa1BjUVhDS1VSNUQxNXhTdkVMSEJLSjlDeXZyandTU0FwK205SEN2endNMTNNSmdsCk9OR0RZWlJvSWpKbUxvcTdHcXArcVJtNU5UcG9hTTE1NXRHMm9RSWhBTjRGdHdLc1Fjd0pwaEhGWWhJanBRSlUKMWFub1dMdnVTQ1MzcnlXbmU5T2pBaUVBMHRSKzROSUNseEI1OG9zcDhVV2tPeEhZc3pHVHJhSjAwcSsyd0VaUAp4REVDSVFDN21KcVZJSldMNEk4NHJzMzV3N0oyTU5aRWRUVWN2ZTZwVDZjbktzZisvd0loQUtuVWNzQTNhODYwCmZ3ZGFBdGRQK2hON05NeGtTMG03YTgrcnE5TUcwSXFCQWlBV0FuYUpxV0tIZDl4ZjZWMlRjbEtUdHhXcmpXV3oKQjlWQVNTSmlwNTVxY2c9PQotLS0tLUVORCBQUklWQVRFIEtFWS0tLS0tCg=='

set :port, 8000

get '/' do
  content_type :json

  payload = {
    user_id: 'user_id_of_your_app'
  }
  token = JWT.encode payload, PRIVATE_KEY, algorithm='RS256'

  {token: token}.to_json
end

