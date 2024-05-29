<template>
    <article class="card">
        <div class="card__image-wrapper">
            <img :src="characterData.image" :alt="characterData.name" />
        </div>
        <div class="card__content-wrapper">
            <div class="card__flex">
                <h2 class="card__name">
                    {{ characterData.name }}
                </h2>
                <span class="card__statuses">
                    {{ characterData.status }} - {{ characterData.species }}
                </span>
            </div>
            <div class="card__flex">
                <span class="card__term-declare">
                    Location:
                </span>
                <span class="card__term-describe">
                    {{ characterData.location.name }}
                </span>
            </div>
            <div class="card__flex">
                <span class="card__term-declare"> Origin :</span>
                <span class="card__term-describe">
                    {{ characterData.origin.name }}
                </span>
            </div>
        </div>
    </article>
</template>
<script lang="ts" setup>
import type { Character } from '@/helpers/api/characters';
interface IProps {
    characterData: Character
}
defineProps<IProps>(); 
</script>
<style lang="scss">
@import '@/assets/ui/card.scss';
</style>