import sys

from flask import Flask, render_template
from flask_flatpages import FlatPages
from flask_frozen import Freezer

app = Flask(__name__)
app.config.from_pyfile('settings.cfg')
pages = FlatPages(app)
freezer = Freezer(app)

@app.route('/')
def index():
    page = pages.get_or_404('index')
    template = page.meta.get('template', 'error.html')
    return render_template(template, page=page)

@app.route('/blog.html')
def blog():
    page = pages.get_or_404('blog')
    # TODO: Sort and prune to the N most recent posts
    blog = [page for page in pages if 'date' in page.meta]
    template = page.meta.get('template', 'error.html')
    return render_template(template, page=page, blog=blog)

@app.route('/blog/<string:name>/')
def post(name):
    page = pages.get_or_404(name)
    template = page.meta.get('template', 'error.html')
    return render_template(template, page=page)

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == 'debug':
        app.run(port=8000)
    else:
        freezer.freeze()
