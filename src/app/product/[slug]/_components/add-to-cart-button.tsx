'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'

import { addProductToCart } from '@/actions/products/add-product-to-cart'
import { Button } from '@/components/ui/button'

interface AddToCartButtonProps {
  productVariantId: string
  quantity: number
}

export const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationKey: ['addProductToCart', productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    },
  })
  //const isPending = false // Replace with actual pending state if needed
  return (
    <Button
      className="rounded-full"
      size="lg"
      variant="outline"
      disabled={isPending}
      onClick={() => mutate()}
    >
      {isPending && <Loader2 className="animate-spin" />}
      Adicionar à sacola
    </Button>
  )
}
