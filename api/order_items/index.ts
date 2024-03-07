import { supabase } from '@/lib/supabase';
import { useMutation } from '@tanstack/react-query';
import { InsertTables } from '@/types';

export const useInsertOrderItems = () => {
  return useMutation({
    async mutationFn(data: InsertTables<'order_items'>[]) {
      const { error, data: newOrder } = await supabase
        .from('order_items')
        .insert(data)
        .select();

      if (error) {
        throw new Error(error.message);
      }
      return newOrder;
    },
  });
};
