<script setup lang="ts">
import {useQuasar, QTable, QInput} from 'quasar'
import {ref} from 'vue'
import {computed} from 'vue'

// CONSTS

const $q = useQuasar()

// PROPS

type Props = {
  loading?: boolean,
  rows?: Array<Record<string, unknown>>,
  columns: Array<TableHeaders>,
  itemsPerPage?: Array<number>,
  defaultSort?: string,
  defaultSortDescending?: boolean
  class?: string,
  showSearch?: boolean,
  search?: string,
  rowKey?: string,
}
type TableHeaders = {
  name: string;
  label: string;
  field: string | ((row: any) => any);
  required?: boolean;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  sort?: (a: any, b: any, rowA: any, rowB: any) => number;
  format?: (val: any) => string;
  style?: string;
  classes?: string;
  headerClasses?: string;
};

const props = withDefaults(defineProps<Props>(), {
  itemsPerPage: () => [10, 25, 50, 100],
  showSearch: true,
  rows: () => [],
})

const emits = defineEmits(['row-click'])

// DATA

const search = ref('')

// Quasar has dumb typing for their slots so this is to disable a typescript error in the template
// https://gist.github.com/loilo/73c55ed04917ecf5d682ec70a2a1b8e2
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function doNothing<T>(val: T): any {
  return val
}

function rowClick(evt: Event, row: any, index: number): void {
  emits('row-click', [evt, row, index])
}

const searchSlot = computed( () =>
    props.showSearch == undefined || props.showSearch
        ? search.value
        : props.search

)

</script>

<template>
  <q-input
      v-if="props.showSearch"
      v-model="search"
      outlined
      label="Search"
      label-slot
      :dense="true"
      single-line
      hide-details
      class="mb-3 shrink"
      prepend-inner-icon="mdi-magnify"
      :style="{maxWidth: '250px'}"
      autofocus
  >
    <template #append>
      <q-icon name="search"></q-icon>
    </template>
  </q-input>

  <q-table
      :rows="props.rows"
      :loading="loading || props.rows === undefined"
      :columns="props.columns"
      :class="props.class"
      :flat="true"
      :filter="searchSlot"
      :table-colspan="8"
      :table-style="{tableLayout: 'fixed'}"
      :table-header-class="{'table-header': !$q.dark.isActive, 'table-header--dark': $q.dark.isActive}"
      :table-header-style="{color: 'white'}"
      :wrap-cells="true"
      :pagination="{sortBy: defaultSort, descending: defaultSortDescending}"
      @row-click="rowClick"
      :rows-per-page-options="props.itemsPerPage"
      :row-key="props.rowKey"
      binary-state-sort
  >
    <!-- pass slots from parent to q-table -->
    <template v-for="(_, name) of $slots" #[doNothing(name)]="slotData">
      <!-- pass properties from q-table to parent, plus some helper functions -->
      <slot :name="name" v-bind="{...slotData}" />
    </template>
  </q-table>
</template>
