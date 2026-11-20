-- Migration: add the Desk Sprint deal type to the deals CHECK constraint (2026-11-20)
ALTER TABLE deals DROP CONSTRAINT IF EXISTS deals_deal_type_check;
ALTER TABLE deals ADD CONSTRAINT deals_deal_type_check
  CHECK (deal_type IN (
    'growth_maintain', 'growth_get_found', 'growth_get_chosen',
    'digital_foundation',
    'operational_systems',
    'intelligence_platform',
    'propertydocz_setup', 'propertyjobz_setup', 'property_combined',
    'vendor_build_495', 'vendor_build_995', 'vendor_build_1495',
    'vendor_buildonly_495', 'vendor_buildonly_995', 'vendor_buildonly_1495',
    'platform_build', 'website_platform_combo',
    'desk_sprint'
  ));
