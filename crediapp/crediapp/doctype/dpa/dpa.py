# -*- coding: utf-8 -*-
# Copyright (c) 2021, orlando and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

@frappe.whitelist()     
def get_provincias():
		sql = """select distinct dpa_despro from  tabDpa order by 1 """
		return frappe.db.sql(sql)

@frappe.whitelist()
def get_cantones( cod_prov ):
		sql = """select distinct dpa_descan from  tabDpa  where dpa_despro  = '{0}' order by 1  """.format(cod_prov)
		return frappe.db.sql(sql)

@frappe.whitelist()
def get_parroquia( cod_can ):
		sql = """select distinct dpa_despar from  tabDpa  where dpa_descan  = '{0}' order by 1  """.format(cod_can)
		return frappe.db.sql(sql)	

class Dpa(Document):
	pass
