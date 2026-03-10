"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, RegisterInput } from "@/lib/validations/auth"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export default function RegisterForm() {
  return (
    <div>
      <h1>Register</h1>
      <form>
        {/* Form fields will go here */}
      </form>
    </div>
  )
}
