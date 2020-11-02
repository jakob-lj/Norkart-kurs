name: Deploy
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main  ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x]

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - run: npm ci
    - run: npm run build --if-present
    - name: Deploy
      run: |
        git config --global user.name $user_name
        git config --global user.email $user_email
        git remote set-url origin https://${github_token}@github.com/${repository}
        npm run deploy
      env:
        user_name: 'Ettellerannet'
        user_email: 'Ettellerannet@epost.no'
        github_token: ${{ secrets.SECRET }}
        repository: ${{ github.repository }}
        

