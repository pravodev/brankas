<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{asset('css/app.css')}}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Document</title>
</head>
<body>
    <div id="brankas">
        <nav class="navbar d-flex">
            <div class="logo">
                <router-link to="/"><icon name="box"></icon> Brankas</router-link>
            </div>
            <div class="navbar--item">
                <navbar-menu></navbar-menu>
                <modal-create-goal></modal-create-goal>
            </div>
        </nav>
        <div class="content">
            <div class="container-fluid">
                <router-view></router-view>
            </div>
        </div>
        <vue-snotify></vue-snotify>
    </div>
    <script src="{{asset('js/build.js')}}"></script>
</body>
</html>
