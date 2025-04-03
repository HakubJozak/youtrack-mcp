# lib/youtrack_api_client.rb

class YoutrackApiClient
  VERSION='0.0.1'

  def get_admin_projects
    fields = '$type,archived,customFields,id,leader($type,id,login,ringId),name,shortName'
    parse get("/admin/projects", params: { fields:  })
  end

  def get_admin_custom_fields
    fields = '$type,fieldType($type,id),id,isAutoAttached,isUpdateable,localizedName,name,ordinal'
    parse get('/admin/customFieldSettings/customFields', params: { fields: })
  end


  private

  def get(path, params: {})
    response = http.get("#{base_url}#{path}", params:)

    unless response.status.ok?
      raise Error, response.body
    end

    response
  end


  def http
    ::HTTP
      .headers(accept: 'application/json')
      .auth("Bearer #{api_key}")
  end

  def parse(response)
    response.body.to_s
  end

  def base_url
    "#{ENV.fetch('YOUTRACK_MCP_URL')}/api"
  end

  def api_key
    ENV.fetch('YOUTRACK_MCP_TOKEN')
  end

end
