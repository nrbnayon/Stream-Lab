
export default function AuthLayout({ children }) {

   return (
      <div className="min-h-dvh grid place-items-center">
         <div className="bg-secondary p-7 rounded-md w-full max-w-lg">
            {children}
         </div>
      </div>
   )
}
