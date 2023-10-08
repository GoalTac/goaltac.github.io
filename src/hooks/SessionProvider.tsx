import { useContext, useState, useEffect, createContext, SetStateAction } from 'react';
import PropTypes from 'prop-types';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';

const SessionContext = createContext({
  user: null,
  session: null,
  supabase: {},
  profile: null
});

export const SessionProvider = ({ children, supabase }: any) => {
  const [user, setUser] = useState<any>();
  const [session, setSession] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>();

  /**
   * To prevent updating duplicate sessions
   * @param callback 
   * @returns 
   */
  function onAuthStateChange(callback: (event : AuthChangeEvent, session: Session) => void) {
    let currentSession: Session | null;
    return supabase.auth.onAuthStateChange((event: any, session: any) => {
      if (session?.user?.id == currentSession?.user?.id) return;
      currentSession = session;
      callback(event, session);
    });
  }

  useEffect(() => {
    const requestSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;

      //re rendering too much is due to getting profile
      if(session) {
        const { 
          data: profileData, 
          error: profileError 
        } = await supabase
          .from('profiles')
          .select('*')
          .eq('userid', session?.user.id).single()
        if (profileError) throw profileError;

        function updateData() {
          setProfile(profileData)
          setSession(session);
          setUser(session?.user);
        }
        updateData()
        setLoading(false);
      }
     
      
      
    };
    

    const { data: listener } = onAuthStateChange(async(event : any, newSession: any) => {
        if (session) {
          const { 
            data: profileData, error: error
          } = await supabase
            .from('profiles')
            .select('*')
            .eq('userid', newSession.user.id).single()

          //useMemo to compare old and new Data to avoid unecessary loading
          function updateData() {
            setProfile(profileData)
            setSession(newSession);
            setUser(newSession?.user);
          }
          updateData()
          
          
          setLoading(false);
        }
        
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
    profile,
  };
  return (
    <SessionContext.Provider value={contextObject}>
      {!loading ? children : null}
    </SessionContext.Provider>
  );
};

SessionProvider.propTypes = {
  children: PropTypes.element,
  supabase: PropTypes.object,
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