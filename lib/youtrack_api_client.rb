# lib/youtrack_api_client.rb

class YoutrackApiClient
  VERSION='0.0.1'

  class Error < StandardError; end

  def get_projects
    fields = '$type,archived,customFields,id,leader($type,id,login,ringId),name,shortName'
    parse get("/admin/projects", params: { fields:  })
  end

  def get_project(id)
    fields = '$type,archived,customFields(id),name,shortName'
    parse get("/admin/projects/#{id}", params: { fields: })
  end

  def get_project_field(project_id, field_id)
    fields = '$type,bundle($type,id),canBeEmpty,defaultValues($type,id,name),emptyFieldText,field($type,fieldType($type,id),id,localizedName,name),id,isPublic,ordinal'
    parse get("/admin/projects/#{project_id}/customFields/#{field_id}", params: { fields: })
  end

  def get_admin_custom_fields
    fields = '$type,fieldType($type,id),id,isAutoAttached,isUpdateable,localizedName,name,ordinal'
    parse get('/admin/customFieldSettings/customFields', params: { fields: })
  end

  def get_admin_custom_field(id)
    fields = '$type,fieldType($type,id),id,isAutoAttached,isUpdateable,localizedName,name,ordinal'
    parse get("/admin/customFieldSettings/customFields/#{id}", params: { fields: })
  end

  def get_issues
  end

  private

  def get(path, params: {})
    response = http.get("#{base_url}#{path}", params:)

    unless response.status.ok?
      raise Error, response.body.to_s
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
