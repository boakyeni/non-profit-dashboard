from django.urls import path

from .views import index, editor, upload, download, image, template

app_name = "mosaico"
urlpatterns = [
    path("", index, name="index"),
    path("editor.html", editor, name="editor"),
    path("img/", image),
    path("upload/", upload),
    path("dl/", download),
    path("template/", template),
]
