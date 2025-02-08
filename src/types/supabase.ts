export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          created_at: string;
        };
        Insert: {
          id: string;
          username: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          created_at?: string;
        };
      };
      games: {
        Row: {
          id: string;
          user_id: string;
          prize_amount: number;
          completed_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          prize_amount: number;
          completed_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          prize_amount?: number;
          completed_at?: string;
        };
      };
    };
    Views: {
      leaderboard: {
        Row: {
          username: string;
          highest_prize: number;
          games_played: number;
        };
      };
    };
  };
}
