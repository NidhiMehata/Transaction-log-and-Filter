import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { AllComponent } from './all/all.component';
import { DailyComponent } from './daily/daily.component';
import { WeeklyComponent } from './weekly/weekly.component';
import { MonthlyComponent } from './monthly/monthly.component';

const routes: Routes = [
    {
        path: 'all',
        component: AllComponent
    },
    {
        path: 'daily',
        component: DailyComponent
    },
    {
        path: 'weekly',
        component: WeeklyComponent
    },

    {
        path: 'monthly',
        component: MonthlyComponent
    },

];

export const appRoutingModule = RouterModule.forRoot(routes);
