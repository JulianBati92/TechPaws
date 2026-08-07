import { redirect } from "next/navigation";
import { isAdmin } from "../../lib/admin-auth";
import AdminDashboard from "./AdminDashboard";
export const metadata = { title:"Órdenes | TechPaws", robots:{ index:false, follow:false } };
export default async function AdminPage(){ if(!(await isAdmin())) redirect("/admin/login"); return <AdminDashboard/>; }
