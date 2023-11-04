export default function Login() {
  return (
    <div className="">
      <div className="w-[400px] rounded-lg shadow-lg bg-zinc-800 p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-white">
          Iniciar sesión
        </h1>
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none text-white/80"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              required
              type="email"
              className="h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm focus:ring-2 focus:ring-offset-0 text-white placeholder:text-white/80"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none text-white/80"
            >
              Contraseña
            </label>
            <input
              id="password"
              required
              type="password"
              className="h-10 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm focus:ring-2 focus:ring-offset-0 text-white placeholder:text-white/80"
            />
          </div>
          <button className="w-full bg-blue-600 text-white rounded-md py-2">
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  )
}
