from django.urls import path

from .views import index, editor, upload, download, image, template, get_template_html

app_name = "mosaico"
urlpatterns = [
    path("", index, name="index"),
    path("editor.html", editor, name="editor"),
    path("img/", image),
    path("upload/", upload),
    path("dl/", download),
    path("template/", template),
    path("get-html/", get_template_html),
]
