# frozen_string_literal: true

# YoutrackService handles business logic and operations
class YoutrackService
  attr_reader :api
  
  def initialize(api = nil)
    @_api = api || YoutrackApiClient.new
  end
  
  # Get a list of all projects with basic information
  def list_projects
    api.get_projects
  end
  
  # Get a specific project by ID
  def get_project(id)
    api.get_project(id)
  end
  
  # Get custom fields configuration from a project
  def get_project_fields(project_id)
    project = api.get_project(project_id)
    return [] unless project&.key?(:customFields)

    project[:customFields].map do |field|
      api.get_project_field(project_id, field[:id]) if field[:id]
    end.compact
  end
  
  private
  
  def default_project
    ENV.fetch('YOUTRACK_MCP_PROJECT')
  end
end