import { useContext, useState, useEffect, createContext, SetStateAction } from 'react';
import PropTypes from 'prop-types';

const SessionContext = createContext({
  user: null,
  session: null,
  supabase: {},
});

export const SessionProvider = ({ children, supabase }: any) => {
  const [user, setUser] = useState<any>();
  const [session, setSession] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const requestSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) throw error;
      setSession(session);
      setUser(session?.user);
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: any, newSession: any) => {
        setSession(newSession);
        setUser(newSession?.user);
        setLoading(false);
      }
    );

    requestSession();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const contextObject = {
    user,
    session,
    supabase,
  };

  return (
    <SessionContext.Provider value={contextObject}>
      {!loading ? children : null}
    </SessionContext.Provider>
  );
};

SessionProvider.propTypes = {
  children: PropTypes.element,
  supabase: undefined, //how to fix
};

export const useSession = () => useContext(SessionContext);

export function useSupabaseClient() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error(
      'useSupabaseClient must be used within a SessionContext provider.'
    );
  }
  return context.supabase;
}