require 'commander/import'
require_relative '../lib/youtrack_api_client'

api = YoutrackApiClient.new

program :name, 'youtrack'
program :version, '0.0.1'
program :description, 'Youtrack MCP'

command :projects do |c|
  c.syntax = 'youtrack projects, [options]'
  c.summary = 'list all projects'


  c.option '--some-switch', 'Some switch that does something'

  c.action do |args, options|
    puts api.get_admin_projects
  end
end

command :issues do |c|
  c.syntax = 'youtrack issues [options]'
  c.summary = ''
  c.description = ''
  c.example 'description', 'command example'
  c.option '--some-switch', 'Some switch that does something'
  c.action do |args, options|
    # Do something or c.when_called Youtrack::Commands::Issues
  end
end
