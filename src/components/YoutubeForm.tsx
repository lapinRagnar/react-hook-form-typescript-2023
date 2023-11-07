import { DevTool } from "@hookform/devtools"
import { useForm } from "react-hook-form"

type FormValue = {
  username: string
  email: string
  channel: string
}

let renderCount = 0


const YoutubeForm = () => {

  const form = useForm<FormValue>()

  const {register, control, handleSubmit} = form
  const {name, ref, onChange, onBlur } = register("username")

  renderCount++

  const onSubmit = (data: FormValue) => {
    console.log("form submitted", data)
  }

  return (
    <div>
      <h1>Youtube Form ({renderCount/2})</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name={name}
          ref={ref}
          onChange={onChange}
          onBlur={onBlur} 
        />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" {...register("email")} />

        <label htmlFor="channel">Channel</label>
        <input type="text" id="channel" {...register("channel")}/>

        <button>Submit</button>
      </form>

      <DevTool control={control} />

    </div>
  )
}

export default YoutubeForm