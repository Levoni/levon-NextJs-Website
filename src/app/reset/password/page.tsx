import PasswordReset from "@/components/password_reset";

type Props = {
    params?: {
      num?: string;
    };
    searchParams?:any
  };

export default async function ResetPasswordPage(props:Props) {
    let resetCode = props.searchParams.resetCode

    return (
        <div style={{flex:'1', display:'flex', justifyContent:'center'}}>
          <PasswordReset resetCode={resetCode}></PasswordReset>
        </div>
    )
}
  