<template>
    <section>
        <form @submit.prevent="search" class="characters-top">
            <div class="characters-filters">
                <VSelect placeholder="Status" :items="['Alive', 'unknown', 'Dead']" density="compact"
                    variant="solo-filled" v-model="filter.status" />
                <VTextField placeholder="Search by name" v-model="filter.name" />
            </div>
            <VBtn type="submit" width="100%">Submit</VBtn>
            <VBtn type="button" @click="resetFilter" width="100%">Reset</VBtn>
        </form>
        <div v-if="characters" class="characters-grid">
            <Card v-for="(item) in characters.results" :key="item.id" :character-data="item" />
        </div>
        <div v-else>
            You didn't find anyone =(
        </div>
        <VPagination total-visible="7" v-model="filter.page" :length="pageInfo?.pages" />
    </section>
</template>
<script setup lang="ts">
import { computed, ref, shallowRef, triggerRef, watch } from 'vue';
import { toQueryString, useAxios } from '@/composables';
import type { AllCharacters } from '@/helpers/api/characters';
import { Card } from '@/components/ui/card';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const filter = ref<{
    status: string | null,
    name: string | null,
    page: number
}>({
    status: (route.query?.status) ? route.query?.status.toString() : null,
    name: (route.query?.name) ? route.query?.name.toString() : null,
    page: route.query?.page ? (parseInt(route.query.page as unknown as string)) : 1
});
const characters = shallowRef<AllCharacters | undefined>(
    (await useAxios<AllCharacters>({
        url: `/api/character/${toQueryString(route.query)}`
    }))?.data
);
const pageInfo = computed(() => {
    if (characters.value) {
        return {
            count: characters.value.info.count,
            pages: characters.value.info.pages,
        }
    } else {
        return undefined;
    }
});

watch(() => filter.value.page, async (newValue) => {
    router.push({
        query: {
            ...route.query,
            'page': newValue
        }
    })
})
watch(() => route.query, async (newVal) => {
    characters.value = (await useAxios<AllCharacters>({
        url: `/api/character/${toQueryString(newVal)}`
    }))?.data
}, {
    deep: true
});
const search = () => {
    filter.value.page = 1;
    router.push({
        query: {
            ...route.query,
            ...filter.value
        }
    })
}
const resetFilter = () => {
    filter.value = {
        name: null,
        page: 1,
        status: null
    }
    router.push({
        query: {}
    })
}
</script>
<style lang="scss">
@import '@/assets/ui/charactersGrid.scss';
</style>