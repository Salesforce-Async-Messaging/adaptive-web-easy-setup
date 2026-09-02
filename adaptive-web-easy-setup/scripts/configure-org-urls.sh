#!/bin/bash
set -e

# Configure Org-Specific URLs for Adaptive Web Easy Setup
# This script automatically replaces hardcoded test URLs with your org's My Domain URL

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================="
echo "Adaptive Web Easy Setup - URL Configuration"
echo "========================================="
echo ""

# Check if org alias is provided
if [ -z "$1" ]; then
    echo -e "${YELLOW}Usage: $0 <org-alias>${NC}"
    echo ""
    echo "Example: $0 mysandbox"
    echo "         $0 myorg"
    echo ""
    exit 1
fi

ORG_ALIAS="$1"

# Check if sf CLI is installed
if ! command -v sf &> /dev/null; then
    echo -e "${RED}Error: Salesforce CLI (sf) is not installed.${NC}"
    echo "Install it from: https://developer.salesforce.com/tools/salesforcecli"
    exit 1
fi

# Get org information.
# Note: `set -e` would abort before the error handler below runs if the
# command fails, so temporarily allow a non-zero exit and capture the status.
echo "Retrieving org information for: $ORG_ALIAS"
ORG_INFO=$(sf org display --target-org "$ORG_ALIAS" --json 2>/dev/null) || ORG_DISPLAY_STATUS=$?

if [ -n "$ORG_DISPLAY_STATUS" ]; then
    echo -e "${RED}Error: Failed to retrieve org information for '$ORG_ALIAS'${NC}"
    echo ""
    echo "Make sure:"
    echo "  1. You're authenticated to the org"
    echo "  2. The org alias '$ORG_ALIAS' is correct"
    echo ""
    echo "Your connected orgs (run 'sf org list' for full details):"
    sf org list 2>/dev/null | grep -E "Alias|salesforce\.com" || echo "  (none — run 'sf org login web' first)"
    echo ""
    echo "To authenticate this org: sf org login web --alias $ORG_ALIAS"
    echo ""
    exit 1
fi

# Extract instance URL
INSTANCE_URL=$(echo "$ORG_INFO" | jq -r '.result.instanceUrl')

if [ -z "$INSTANCE_URL" ] || [ "$INSTANCE_URL" == "null" ]; then
    echo -e "${RED}Error: Could not determine org URL${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Found org URL: $INSTANCE_URL${NC}"
echo ""

# Validate URL format
if [[ ! "$INSTANCE_URL" =~ ^https:// ]]; then
    echo -e "${RED}Error: Invalid URL format: $INSTANCE_URL${NC}"
    exit 1
fi

# File paths
REMOTE_SITE_FILE="$PROJECT_ROOT/force-app/main/default/remoteSiteSettings/Adaptive_Web_Setup_Server.remoteSite-meta.xml"
CSP_SITE_FILE="$PROJECT_ROOT/force-app/main/default/cspTrustedSites/Org_Self.cspTrustedSite-meta.xml"

# Check if files exist
if [ ! -f "$REMOTE_SITE_FILE" ]; then
    echo -e "${RED}Error: Remote Site Settings file not found:${NC}"
    echo "$REMOTE_SITE_FILE"
    exit 1
fi

if [ ! -f "$CSP_SITE_FILE" ]; then
    echo -e "${RED}Error: CSP Trusted Site file not found:${NC}"
    echo "$CSP_SITE_FILE"
    exit 1
fi

# Backup files before modification.
# IMPORTANT: write backups OUTSIDE force-app/ — a .backup-* copy left inside a
# metadata folder is picked up by the deploy as a duplicate of the same
# component (e.g. two Org_Self.cspTrustedSite files), which fails the deploy.
BACKUP_DIR="$SCRIPT_DIR/.url-backups"
mkdir -p "$BACKUP_DIR"
BACKUP_STAMP="$(date +%Y%m%d-%H%M%S)"
cp "$REMOTE_SITE_FILE" "$BACKUP_DIR/$(basename "$REMOTE_SITE_FILE").backup-$BACKUP_STAMP"
cp "$CSP_SITE_FILE" "$BACKUP_DIR/$(basename "$CSP_SITE_FILE").backup-$BACKUP_STAMP"

echo "Creating backups (in $BACKUP_DIR)..."
echo -e "${GREEN}✓ Backed up Remote Site Settings${NC}"
echo -e "${GREEN}✓ Backed up CSP Trusted Site${NC}"
echo ""

# Update Remote Site Settings
echo "Updating Remote Site Settings..."

# Use sed with different syntax for macOS vs Linux
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|<url>https://[^<]*</url>|<url>$INSTANCE_URL</url>|g" "$REMOTE_SITE_FILE"
else
    # Linux
    sed -i "s|<url>https://[^<]*</url>|<url>$INSTANCE_URL</url>|g" "$REMOTE_SITE_FILE"
fi

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Updated: $REMOTE_SITE_FILE${NC}"
else
    echo -e "${RED}✗ Failed to update Remote Site Settings${NC}"
    exit 1
fi

# Update CSP Trusted Site
echo "Updating CSP Trusted Site..."

if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    sed -i '' "s|<endpointUrl>https://[^<]*</endpointUrl>|<endpointUrl>$INSTANCE_URL</endpointUrl>|g" "$CSP_SITE_FILE"
else
    # Linux
    sed -i "s|<endpointUrl>https://[^<]*</endpointUrl>|<endpointUrl>$INSTANCE_URL</endpointUrl>|g" "$CSP_SITE_FILE"
fi

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Updated: $CSP_SITE_FILE${NC}"
else
    echo -e "${RED}✗ Failed to update CSP Trusted Site${NC}"
    exit 1
fi

echo ""
echo "========================================="
echo -e "${GREEN}✓ Configuration Complete!${NC}"
echo "========================================="
echo ""
echo "Updated files:"
echo "  - Remote Site Settings: Adaptive_Web_Setup_Server"
echo "  - CSP Trusted Site: Org_Self"
echo ""
echo "Both files now point to: $INSTANCE_URL"
echo ""
echo "Backups created with suffix: $BACKUP_SUFFIX"
echo ""
echo "Next steps:"
echo "  1. Review changes: git diff"
echo "  2. Deploy metadata: sf project deploy start --manifest package.xml -o $ORG_ALIAS"
echo "  3. Assign permission set: sf org assign permset -n Adaptive_Web_Setup_User -o $ORG_ALIAS"
echo "  4. Run the wizard: sf org open -o $ORG_ALIAS"
echo ""
