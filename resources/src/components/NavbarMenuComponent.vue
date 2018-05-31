<template>
    <b-button-group>
        <b-btn v-b-modal.modal1><icon name="plus" base-class="icon-sm"></icon> Create a Goal</b-btn>
        <b-btn to="/setting" class="btn btn-primary"><icon name="settings" base-class="icon-sm"></icon> Settings</b-btn>
        <!-- <button class="btn btn-secondary" onclick="event.preventDefault();
        document.getElementById('logout-form').submit();"><icon name="log-out" base-class="icon-sm"></icon> Logout</button>
        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
            @csrf
        </form> -->
    </b-button-group>
</template>

<script>
export default {
    name: 'navbar-menu',
}
</script>

