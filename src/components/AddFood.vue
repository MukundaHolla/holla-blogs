<template>
    <div class="add-food container">
        <h2 class="center-align indigo-text">Add New Food Recipie</h2>
        <form @submit.prevent="addFood">
            <div class="field title">
                <label for="title">Food Title:</label>
                <input type="text" name="title" id="" v-model="title">
            </div>
            <div v-for="(ing, index) in ingredients" :key="index" class="field">
                <label for="ingredient">Ingredients:</label>
                <input type="text" name="ingredient" id="" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient">Add Ingredient: (Press tab to add)</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">Add Food</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
    name: 'AddFood',
    data() {
        return {
            title: null,
            another: null,
            ingredients: [],
            feedback: null,
            slug: null
        }
    },
    methods: {
        addFood() {
            if(this.title) {
                this.feedback = null
                // create a slug
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true
                })
                db.collection('smoothies').add({
                    title: this.title,
                    ingredients: this.ingredients,
                    slug: this.slug
                }).then(() => {
                    this.$router.push({ name: 'Index'})
                }).catch(err => {
                    console.log(err)
                })
            } else {
                this.feedback = 'Please enter the title'
            }
        },
        addIng() {
            if(this.another) {
                this.ingredients.push(this.another)
                this.another = null
                this.feedback = null
            } else {
                this.feedback = 'Enter at least one ingredient'
            }
        },
        deleteIng(ing) {
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != ing
            })
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
        position: relative;
    }
    .add-food .delete {
        position: absolute;
        right: 0;
        bottom: 16px;
        color: #aaa;
        font-size: 1.4em;
        cursor: pointer;
    }
</style>