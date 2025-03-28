"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBar() {
  return (
    <div className="relative">
      <Input
        type="search"
        placeholder="Buscar trámites, servicios o información..."
        className="w-full pl-10 pr-4 py-2"
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
      <Button className="absolute right-2 top-1">
        Buscar
      </Button>
    </div>
  )
}