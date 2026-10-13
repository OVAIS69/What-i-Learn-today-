<#
.SYNOPSIS
    Local Auto-Commit Script for What-i-Learn-today-
.DESCRIPTION
    Runs the Node.js commit script to log learning topics and optionally push to GitHub.
.EXAMPLE
    .\run_local_commit.ps1 -Count 5 -Push
#>

param (
    [int]$Count = 1,
    [switch]$Push
)

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$jsScript = Join-Path $scriptDir "scripts\auto_commit.js"

if (-not (Test-Path $jsScript)) {
    Write-Error "Could not find $jsScript"
    exit 1
}

$pushArg = if ($Push) { "--push" } else { "" }
node "$jsScript" "--count=$Count" $pushArg
