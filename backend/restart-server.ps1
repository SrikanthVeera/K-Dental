# PowerShell script to restart the backend server

Write-Host "🔄 Restarting Backend Server..." -ForegroundColor Cyan
Write-Host ""

# Stop any running node processes
Write-Host "1️⃣ Stopping existing server..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    $nodeProcesses | Stop-Process -Force
    Write-Host "   ✅ Stopped $($nodeProcesses.Count) node process(es)" -ForegroundColor Green
    Start-Sleep -Seconds 2
} else {
    Write-Host "   ℹ️  No running node processes found" -ForegroundColor Gray
}

# Check if we're in the backend directory
if (-not (Test-Path "package.json")) {
    Write-Host "   ❌ Error: Not in backend directory!" -ForegroundColor Red
    Write-Host "   Please run this script from the backend folder" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "2️⃣ Starting server..." -ForegroundColor Yellow
Write-Host ""

# Start the server
npm run dev
