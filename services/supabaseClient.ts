import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hznbajfzayqigkjsfklk.supabase.co';
const supabaseKey = 'sb_publishable_3agw-rFXUGX2ndBmWpn3xQ_Xf_WB1EU';

export const supabase = createClient(supabaseUrl, supabaseKey);