
  # Untitled

  This is a code bundle for Untitled. The original project is available at https://www.figma.com/design/C3GHEsnL2BZJ38YaIUrGvi/Untitled.

  ## Running the code

  Installing docker tools to run the project:

  - sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

  Running Docker in dev mode (Hot Reload):
  
  - docker compose up

  Running Docker in prod mode:

  - docker compose -f docker-compose.yml up --build
