import Header from "./components/Header.tsx";
import { createClient, User } from "@supabase/supabase-js";
import TableUser from "./components/TableUser.tsx";
import AddUserModals from "./components/ModalAddUser.tsx";
import "./App.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

function App() {
  return (
    <div className="pl-10 pr-[100px]">
      <Header />
      <div className="mt-10 flex flec items-center justify-between mb-10">
        <p>List User</p>
        <AddUserModals />
      </div>
      <TableUser />
    </div>
  );
}

export default App;
