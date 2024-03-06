import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { InsertTables } from '@/types';

export const useInsertOrderItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: InsertTables<'order_items'>) {
      const { error, data: newOrder } = await supabase
        .from('order_items')
        .insert({ ...data })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newOrder;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};
