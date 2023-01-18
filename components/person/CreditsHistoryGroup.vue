<template>
  <tr >
    <td >
      <table>
        <tbody>
        <CreditsHistoryItem
          v-for="credit in group.credits"
          :key="`credit-${credit.credit_id}`"
          :year="group.year"
          :credit="credit" />
        </tbody>
      </table>
    </td>
  </tr>
</template>

<script>
import CreditsHistoryItem from '~/components/person/CreditsHistoryItem';

export default {
  components: {
    CreditsHistoryItem,
  },

  props: {
    group: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
</style>