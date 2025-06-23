import useIsDeployer from "../hooks/useIsDeployer";

function AdminCheck() {
  const isOwner = useIsDeployer();
  return (
    <div>
      {isOwner
        ? "✅ You’re the admin (deployer) — welcome!"
        : "⚠️ You’re *not* the deployer/admin."}
    </div>
  );
}
export default AdminCheck;