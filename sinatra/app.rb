require 'fastimage_resize'

class Scroogify < Sinatra::Base
  get '/scroogify/:width/:url' do
    file =
    FastImage.resize_local(params[:url], params[:width])
  end
end
