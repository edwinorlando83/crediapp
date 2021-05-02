# -*- coding: utf-8 -*-
# Copyright (c) 2021, orlando and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
# import frappe
from frappe.model.document import Document

class hoja_trabajo(Document):
	def before_save(self):
		self.total_activosfijneg = self.total_mueblesenseres + self.total_maquinaria  + self.total_terrenos  + self.total_vehiculo  + self.total_otrosactivos 
		self.rt_corrientes = self.efectivo + self.bancos + self.total_otrosactivos + self.total_saldo +self.total_inventario 
		self.rt_fijos = self.total_mueblesenseres + self.total_maquinaria + self.total_vehiculo + self.total_terrenos
		self.rt_activos_negocio =  self.rt_corrientes + self.rt_fijos
		self.rt_activos_socio =  self.rt_activos_negocio + self.total_activos_familiares 
		self.rt_pasivo_cp = self.total_cuentasporcobrar + self.total_prestamos + self.total_otros_pasivos
		self.rt_pasivo_lp = self.total_prestamolargo
		if  self.rt_pasivo_cp is None:
			self.rt_pasivo_cp = 0 
		if  self.rt_pasivo_lp is None:
			self.rt_pasivo_lp = 0 

		self.rt_pasivo = self.rt_pasivo_cp + self.rt_pasivo_lp
		self.tt_ingresonetouf = self.ingre_act3 - self.gastos_act3 + self.flujo_ingresos_integral[1].valor + self.flujo_ingresos_integral[2].valor + self.flujo_ingresos_integral[3].valor+ self.flujo_ingresos_integral[4].valor - self.total_gastos_familiares
		sumacuotas=0.0
		for r in self.prestamos:
			sumacuotas = sumacuotas + r.cuota
		self.tt_pagocuotas = sumacuotas
		self.tt_flujointegral =  self.tt_ingresonetouf - 	self.tt_pagocuotas

		self.i_liquidez = round(self.rt_pasivo_cp /  self.rt_corrientes *100,2)
		self.i_endeuda =  round(self.rt_pasivo  / (self.rt_activos_socio  - self.rt_pasivo ) *100,2)
		self.i_endeuda_f = round((  self.rt_pasivo + self.monto) / (self.rt_activos_socio  - self.rt_pasivo )  *100,2)
		
		if self.tt_flujointegral > 0:
			self.i_razon_cuota = round(self.cuota / self.tt_flujointegral * 100,2)




