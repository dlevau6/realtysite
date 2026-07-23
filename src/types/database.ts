export type ListingStatus = "Active" | "Pending" | "Sold" | "Coming Soon";

export type Listing = {
  id: string;
  mls_number: string;
  slug: string;
  status: ListingStatus;
  list_price: number;
  address_line: string;
  city: string;
  state: string;
  zip: string;
  neighborhood_slug: string | null;
  bedrooms: number;
  bathrooms: number;
  square_feet: number;
  lot_size_acres: number | null;
  year_built: number | null;
  description: string;
  latitude: number | null;
  longitude: number | null;
  primary_photo_url: string | null;
  photo_urls: string[];
  listing_agent_name: string;
  listing_office_name: string;
  // Required IDX/RESO attribution fields — check the client's MLS
  // board display rules before removing any of these from the UI.
  mls_name: string;
  idx_disclaimer: string;
  last_synced_at: string;
  created_at: string;
}

export type Neighborhood = {
  slug: string;
  name: string;
  city: string;
  state: string;
  summary: string;
  body: string;
  hero_image_url: string | null;
  latitude: number | null;
  longitude: number | null;
}

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  listing_id: string | null;
  source_page: string;
  created_at: string;
}

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: string;
  };
  public: {
    Tables: {
      listings: {
        Row: Listing;
        Insert: Partial<Listing> & Pick<Listing, "mls_number" | "slug">;
        Update: Partial<Listing>;
        Relationships: [
          {
            foreignKeyName: "listings_neighborhood_slug_fkey";
            columns: ["neighborhood_slug"];
            isOneToOne: false;
            referencedRelation: "neighborhoods";
            referencedColumns: ["slug"];
          },
        ];
      };
      neighborhoods: {
        Row: Neighborhood;
        Insert: Partial<Neighborhood> & Pick<Neighborhood, "slug" | "name">;
        Update: Partial<Neighborhood>;
        Relationships: [];
      };
      leads: {
        Row: Lead;
        Insert: Partial<Lead> & Pick<Lead, "name" | "email" | "source_page">;
        Update: Partial<Lead>;
        Relationships: [
          {
            foreignKeyName: "leads_listing_id_fkey";
            columns: ["listing_id"];
            isOneToOne: false;
            referencedRelation: "listings";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
