$NodeDir = Join-Path $PSScriptRoot ".tools\node-v20.20.2-win-x64"

if (-not (Test-Path (Join-Path $NodeDir "node.exe"))) {
  Write-Error "Node.js 20.20.2 was not found at $NodeDir"
  exit 1
}

$env:Path = "$NodeDir;$env:Path"

Write-Host "Using Node $(node -v) and npm $(npm -v)"
