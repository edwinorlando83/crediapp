# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "crediapp"
app_title = "crediapp"
app_publisher = "orlando"
app_description = "Asesor"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "edwin_orlando83@hotmail.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/crediapp/css/crediapp.css"
# app_include_js = "/assets/crediapp/js/crediapp.js"

# include js, css files in header of web template
# web_include_css = "/assets/crediapp/css/crediapp.css"
# web_include_js = "/assets/crediapp/js/crediapp.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

doctype_js = {"Prospectos" : "public/js/utils.js","Socio" : "public/js/utils.js"  }

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "crediapp.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "crediapp.install.before_install"
# after_install = "crediapp.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "crediapp.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

#permission_query_conditions = {
# 	"Prospectos": "crediapp.crediapp.doctype.prospectos.prospectos.get_permission_query_conditions",
# }
#
#has_permission = {
#"Prospectos": "crediapp.crediapp.doctype.prospectos.prospectos.has_permission",
#}

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
#	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"crediapp.tasks.all"
# 	],
# 	"daily": [
# 		"crediapp.tasks.daily"
# 	],
# 	"hourly": [
# 		"crediapp.tasks.hourly"
# 	],
# 	"weekly": [
# 		"crediapp.tasks.weekly"
# 	]
# 	"monthly": [
# 		"crediapp.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "crediapp.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "crediapp.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "crediapp.task.get_dashboard_data"
# }

