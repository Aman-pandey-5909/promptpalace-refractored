"use client";
import DashboardPage from "@/pages/user/DashboardPage";
import { User } from "@/schemas/user";
import { useUser } from "@/stores/userStore";

const Dashboard = () => {
  const user = useUser((state: any) => state.user) as User;
  return (
    <div>
      <h1>Dashboard</h1>
      <div>{user && <DashboardPage user={user} />}</div>
    </div>
  );
};

export default Dashboard;
