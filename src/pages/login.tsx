import useAuth from "@/hooks/useAuth";
import { authService } from "@/services/auth";
import { GetStaticProps, InferGetStaticPropsType } from "next";

// export const getStaticProps: GetStaticProps<{
//   data: any;
// }> = async () => {
//   const data = await authService.login();
//   return { props: { data } };
// };

export default function Login() {
  const { doLogin } = useAuth();

  return (
    <div>
      <button onClick={doLogin}>login</button>
    </div>
  );
}
