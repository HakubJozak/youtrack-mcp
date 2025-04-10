require 'commander/import'

service = YoutrackService.new

program :name, 'youtrack'
program :version, '0.0.1'
program :description, 'Youtrack MCP'

# Display help by default if no command given
default_command :help

command :projects do |c|
  c.syntax = 'youtrack projects, [options]'
  c.summary = 'list all projects'


  c.option '--some-switch', 'Some switch that does something'

  c.action do |args, options|
    puts service.list_projects
  end
end

command :project do |c|
  c.syntax = 'youtrack project [options]'
  c.summary = 'get a project by id'
  c.description = 'Retrieves a project by its ID'

  c.action do |args, options|
    if args.empty?
      puts "Please provide a project ID"
      exit
    end

    project_id = args[0]
    puts service.get_project(project_id)
  end
end

command :fields do |c|
  c.syntax = 'youtrack fields PROJECT_ID'
  c.summary = 'list custom fields for a project'
  c.description = 'Retrieves all custom fields configured for a YouTrack project'
  
  c.action do |args, options|
    if args.empty?
      puts "Please provide a project ID"
      exit
    end
    
    project_id = args[0]
    puts service.get_project_fields(project_id)
  end
end

command :field do |c|
  c.syntax = 'youtrack field [options]'
  c.summary = 'get a custom field by id'
  c.description = 'Retrieves a custom field by its ID'

  c.action do |args, options|
    if args.empty?
      puts "Please provide a field ID"
      exit
    end

    field_id = args[0]
    puts api.get_admin_custom_field(field_id) rescue puts "Custom field not implemented yet"
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
