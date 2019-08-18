<template>
    <div class="add-food container">
        <h2 class="center-align indigo-text">Add New Food Recipie</h2>
        <form @submit.prevent="addFood">
            <div class="field title">
                <label for="title">Food Title:</label>
                <input type="text" name="title" id="" v-model="title">
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add Ingredient:</label>
                <input type="text" name="add-ingredient">
            </div>
            <div class="field center-align">
                <button class="btn pink">Add Food</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'AddFood',
    data() {
        return {
            title: null
        }
    }
}
</script>

<style>
    .add-food {
        margin-top: 60px;
        padding: 20px;
        max-width: 500px;
    }
    .add-food h2 {
        font-size: 2em;
        margin: 20px;
    }
    .add-food .field {
        margin: 20px auto;
    }
</style>